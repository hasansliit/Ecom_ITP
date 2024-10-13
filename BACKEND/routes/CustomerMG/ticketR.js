import express from 'express';
import multer from 'multer';
import { Ticket } from '../model/TicketM.js';
import mongoose from 'mongoose'; 


// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
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
    if (!request.body.title || !request.body.email || !request.body.description) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const newTicket = {
      title: request.body.title,
      email: request.body.email,
      description: request.body.description,
      attachment: request.file ? request.file.path : null, 
    };

    const ticket = await Ticket.create(newTicket);
    return response.status(201).send(ticket);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a ticket
router.put('/:id', upload.single('attachment'), async (request, response) => {
  try {
    // Check if required fields are present
    if (!request.body.title || !request.body.email || !request.body.description) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const { id } = request.params;

    // Prepare the updated ticket data
    const updatedTicket = {
      title: request.body.title,
      email: request.body.email,
      description: request.body.description,
      attachment: request.file ? request.file.path : undefined, // Update attachment if new file is uploaded
    };

    // Remove fields with undefined values
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
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one ticket from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const ticket = await Ticket.findById(id);

    return response.status(200).json(ticket);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for fetching all tickets
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

  // Validate the ID first
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

// Route for marking a ticket as deleted
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
    res.status(200).json({ message: 'Ticket marked as deleted', ticket });
  } catch (error) {
    console.error('Error marking ticket as deleted:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Optional: Route to delete a ticket permanently
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate the ID first
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
