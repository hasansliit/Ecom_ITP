import express from 'express';
import multer from 'multer';
import { Ticket } from '../model/TicketM.js';
import mongoose from 'mongoose';

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

// Add file type validation
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Invalid file type");
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  }
});

const router = express.Router();

// Route for saving a new ticket with file upload
router.post('/', upload.single('attachment'), async (request, response) => {
  try {
    // Validate input fields
    if (!request.body.title || !request.body.email || !request.body.description) {
      return response.status(400).send({ message: 'Please send all required fields' });
    }

    // Create attachment object if file is uploaded
    const attachment = request.file
      ? {
          name: request.file.originalname,  // Original file name
          url: `http://localhost:5579/uploads/${request.file.filename}`  // Public file URL
        }
      : null;  // No file uploaded

    // Create a new ticket object
    const newTicket = {
      title: request.body.title,
      email: request.body.email,
      description: request.body.description,
      attachment: attachment,
    };

    // Save the ticket to the database
    const ticket = await Ticket.create(newTicket);
    return response.status(201).send(ticket);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: 'Error creating ticket' });
  }
});

// Route for updating an existing ticket
router.put('/:id', upload.single('attachment'), async (request, response) => {
  try {
    // Validate input fields
    if (!request.body.title || !request.body.email || !request.body.description) {
      return response.status(400).send({ message: 'Please send all required fields' });
    }

    // Find the ticket by id
    const { id } = request.params;

    // Update attachment if new file is uploaded
    const updatedAttachment = request.file
      ? {
          name: request.file.originalname,
          url: `http://localhost:5579/uploads/${request.file.filename}`
        }
      : undefined;  // No new file uploaded

    // Create updated ticket object
    const updatedTicket = {
      title: request.body.title,
      email: request.body.email,
      description: request.body.description,
      attachment: updatedAttachment || undefined,  // Update only if new file is uploaded
    };

    // Remove undefined fields (e.g., attachment if not uploaded)
    Object.keys(updatedTicket).forEach(key => {
      if (updatedTicket[key] === undefined) {
        delete updatedTicket[key];
      }
    });

    // Update the ticket in the database
    const result = await Ticket.findByIdAndUpdate(id, updatedTicket, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Ticket not found' });
    }

    return response.status(200).send({ message: 'Ticket updated successfully', ticket: result });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: 'Error updating ticket' });
  }
});

// Route for getting one ticket from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return response.status(404).json({ message: 'Ticket not found' });
    }

    return response.status(200).json(ticket);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: 'Error fetching ticket' });
  }
});

// Route for fetching all non-deleted tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find({ deleted: false });
    return res.status(200).json({
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for fetching deleted tickets
router.get('/deleted', async (req, res) => {
  try {
    const deletedTickets = await Ticket.find({ deleted: true });
    return res.status(200).json({ count: deletedTickets.length, data: deletedTickets });
  } catch (error) {
    console.error('Error fetching deleted tickets:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for restoring a deleted ticket
router.put('/restore/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ticket ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ticket ID' });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(id, { deleted: false }, { new: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(200).json({ message: 'Ticket restored', ticket });
  } catch (error) {
    console.error('Error restoring ticket:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for marking a ticket as deleted (soft delete)
router.put('/delete/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id, 
      { deleted: true, deletedAt: new Date() }, 
      { new: true }
    );
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    return res.status(200).json({ message: 'Ticket marked as deleted', ticket });
  } catch (error) {
    console.error('Error marking ticket as deleted:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Optional: Route to delete a ticket permanently
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ticket ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ticket ID' });
  }

  try {
    const ticket = await Ticket.findByIdAndDelete(id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    return res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
