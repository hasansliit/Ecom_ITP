import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDashboard() {
  const conversionsChartRef = useRef(null);
  const salesChartRef = useRef(null);

  useEffect(() => {
    // Destroy existing charts before creating new ones
    if (conversionsChartRef.current) {
      conversionsChartRef.current.destroy();
    }
    if (salesChartRef.current) {
      salesChartRef.current.destroy();
    }

    // Conversions Chart
    const conversionsCtx = document.getElementById("conversionsChart").getContext("2d");
    conversionsChartRef.current = new Chart(conversionsCtx, {
      type: "bar",
      data: {
        labels: [
          "Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8",
          "Oct 9", "Oct 10", "Oct 11", "Oct 12"
        ],
        datasets: [
          {
            label: "Conversions",
            data: [25, 15, 30, 20, 25, 10, 20, 30, 20, 25, 20, 30],
            backgroundColor: "#4e73df" // Dark blue color
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Sales Chart
    const salesCtx = document.getElementById("salesChart").getContext("2d");
    salesChartRef.current = new Chart(salesCtx, {
      type: "line",
      data: {
        labels: [
          "Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8",
          "Oct 9", "Oct 10", "Oct 11", "Oct 12"
        ],
        datasets: [
          {
            label: "Sales",
            data: [
              10000, 15000, 20000, 25000, 18000, 22000, 30000,
              28000, 26000, 27000, 29000, 30000
            ],
            borderColor: "#4e73df",  // Dark blue for line
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      if (conversionsChartRef.current) {
        conversionsChartRef.current.destroy();
      }
      if (salesChartRef.current) {
        salesChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container-fluid mt-4 bg-light">
      <div className="row">
        {/* Conversions Chart */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow p-4 bg-white rounded">
            <div className="dashboard-header text-primary h5">Conversions</div>
            <canvas id="conversionsChart"></canvas>
          </div>
        </div>
      </div> {/* Added this closing div to fix the error */}

      <div className="row">
        {/* Sales Chart */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="card shadow p-4 bg-white rounded">
            <div className="dashboard-header text-primary h5">Sales</div>
            <canvas id="salesChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
