import React, { useState, useRef, useEffect } from 'react';

const DepositModal = ({ isOpen, onClose, onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const modalRef = useRef(null);

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
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-[#23272c] rounded-xl p-2 w-56 mx-4 shadow-2xl border-4 border-[#e4eaf019]">
        <div className="space-y-3">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter Amount"
            className="w-full bg-[#23272c] text-white px-2 py-2 rounded-lg focus:outline-none text-left text-base border border-[#e4eaf019] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          
          <button
            onClick={handleDepositSubmit}
            className="deposit-submit-btn w-full gradient-btn rounded-lg text-white font-base text-base"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;