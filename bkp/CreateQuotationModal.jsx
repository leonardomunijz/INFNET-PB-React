// src/components/CreateQuotationModal.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../auth/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useSnackbar } from 'notistack';

const CreateQuotationModal = ({ open, onClose }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [observation, setObservation] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'fornecedores'));
        const suppliersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSuppliers(suppliersList);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error.message);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'cotacoes'), {
        supplierId: selectedSupplier,
        price: parseFloat(price),
        observation,
        createdAt: new Date()
      });
      enqueueSnackbar('Cotação criada com sucesso!', { variant: 'success' });
      setSelectedSupplier('');
      setPrice('');
      setObservation('');
      onClose();
    } catch (error) {
      console.error("Erro ao criar cotação:", error.message);
      enqueueSnackbar('Erro ao criar cotação.', { variant: 'error' });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Criar Cotação</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="supplier-label">Fornecedor</InputLabel>
            <Select
              labelId="supplier-label"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              required
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Valor"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Observação"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          <div className="mt-4 flex justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Criar Cotação
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuotationModal;
