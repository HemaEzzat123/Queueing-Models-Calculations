# Queueing Models Calculations (MM1, MM1K, MMC, MMCK)

A JavaScript-based project to simulate and calculate queueing models. This project provides a detailed implementation of various queueing systems, including **MM1**, **MM1K**, **MMC**, and **MMCK**, to help analyze the performance of systems under different scenarios.

### **Features**
- **MM1** (Single server, unlimited queue capacity)
- **MM1K** (Single server, limited queue capacity)
- **MMC** (Multiple servers, unlimited queue capacity)
- **MMCK** (Multiple servers, limited queue capacity)
- Metrics calculations:
  - **L**: Average number of customers in the system.
  - **Lq**: Average number of customers in the queue.
  - **W**: Average time a customer spends in the system.
  - **Wq**: Average time a customer spends in the queue.
  - **Blocked Customers** (for systems with limited capacity)
- Dynamic generation of interarrival and service times using exponential distributions.
- Customizable parameters:
  - Arrival rate (λ)
  - Service rate (μ)
  - Number of customers (N)
  - Queue capacity (K)
  - Number of servers (C)

### **Technologies Used**
- React 
- Tailwind CSS
- Charts.js 

---

## **Getting Started**

Follow the steps below to set up and run the project locally:

### **Prerequisites**
Make sure you have the following installed:
- Node.js (optional if you plan to use modern JavaScript tools)
- A code editor (e.g., Visual Studio Code)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Queueing-Models-Calculations.git
   cd Queueing-Models-Calculations
