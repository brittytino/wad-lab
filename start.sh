#!/bin/bash

echo "========================================="
echo "  Full-Stack CRUD Applications Starter  "
echo "========================================="
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  WARNING: MongoDB doesn't appear to be running!"
    echo "   Please start MongoDB before continuing."
    echo "   - On Ubuntu/Linux: sudo systemctl start mongod"
    echo "   - On Mac: brew services start mongodb-community"
    echo "   - Or use MongoDB Compass"
    echo ""
fi

echo "📦 Starting Backend Server..."
cd backend
node server.js &
BACKEND_PID=$!

echo "✅ Backend started on http://localhost:5000"
echo ""
echo "⏳ Waiting 3 seconds for backend to initialize..."
sleep 3

echo "🎨 Starting Frontend Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================="
echo "  Servers are starting...               "
echo "========================================="
echo "  Backend:  http://localhost:5000       "
echo "  Frontend: http://localhost:3000       "
echo "========================================="
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to press Ctrl+C
wait
