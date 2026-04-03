# Data Mining Project: E-Commerce Cross-Selling Platform

An intelligent, full-stack E-Commerce application that uses Machine Learning to provide real-time "Frequently Bought Together" recommendations based on items added to a user's cart. 

## How It Works
This project implements the **FP-Growth Algorithm** (Market Basket Analysis) to mine association rules from a massive dataset of grocery orders. 

1. **Offline Processing:** The raw data was processed, downcasted for memory efficiency, and run through the FP-Growth algorithm to find strong item correlations (Support, Confidence, and Lift).
2. **Backend API:** The pre-calculated rules (`association_rules.csv`) are loaded into the server's RAM on startup. A FastAPI server exposes an endpoint to query these rules instantly.
3. **Frontend UI:** A React interface allows users to add items to a virtual cart. When an item is added, it queries the backend and displays interactive cross-selling recommendations.

## Tech Stack
* **Frontend:** React.js, Vite, HTML/CSS
* **Backend:** Python, FastAPI, Uvicorn
* **Data Science/ML:** Pandas, MLxtend (FP-Growth)

---

## How to Run the Project Locally

To run this application, you will need to run the backend API and the frontend UI in two separate terminal windows.

### Prerequisites
Make sure you have the following installed on your machine:
* [Python 3.8+](https://www.python.org/downloads/)
* [Node.js & npm](https://nodejs.org/)

### Step 1: Start the Python Backend
The backend needs to load the Machine Learning rules and listen for requests.

1. Open a terminal and navigate to the main project folder.
2. Install the required Python libraries:
   ```bash
   pip install fastapi uvicorn pandas
   ```
   3. Start the server:
   ```bash
   python app.py
   ```
   *You should see a message indicating the server is running on `http://127.0.0.1:8000` and the engine loaded successfully.*

### Step 2: Start the React Frontend
The frontend provides the interactive user interface.

1. Open a second, new terminal window.
2. Navigate into the frontend folder:
   ```bash
   cd frontend
   ```
3. Install the required Node packages (only needed the first time):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Step 3: View the Application
Once the React server starts, it will provide a local link in your terminal. 

1. Open your web browser and go to: `http://localhost:5173`
2. Click **"Add to Cart"** on any item to see the real-time AI recommendations appear in the right-hand sidebar!

---

### Troubleshooting (Windows Users)
If you get an error saying `npm : File ... cannot be loaded because running scripts is disabled on this system` when trying to run the frontend, open your PowerShell terminal as an Administrator and run this command:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Press `Y` to confirm. You can now run npm commands successfully.
   
