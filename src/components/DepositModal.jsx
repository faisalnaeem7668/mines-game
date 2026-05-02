import React, { useState } from 'react';

const DepositModal = ({ isOpen, onClose, onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleDepositSubmit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      onDeposit(amount);
      setDepositAmount('');
      onClose();
    } else {
      alert('Please enter a valid amount');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Deposit Money</h2>
        
        <div className="space-y-4">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter Amount"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg"
            autoFocus
          />
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 py-3 rounded-lg text-white font-semibold hover:bg-gray-600 text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleDepositSubmit}
              className="flex-1 gradient-btn py-3 rounded-lg text-white font-semibold text-base"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;