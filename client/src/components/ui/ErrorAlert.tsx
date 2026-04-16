import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="mb-6 overflow-hidden"
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <div className="p-1 bg-red-100 rounded-lg text-red-600 shrink-0">
              <AlertCircle size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-red-800">Something went wrong</h4>
              <p className="text-sm text-red-600 mt-0.5">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-100 rounded-lg text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
