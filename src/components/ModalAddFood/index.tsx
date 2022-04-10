import React, { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input';

interface ModalAddFoodProps {
    isOpen: boolean;
    setIsOpen: () => void;
    handleAddFood: (food : iFood) => Promise<void>;
}

interface iFood {
    available: boolean;
    image: string;
    name: string;
    description: string;
    price: number;
    id: string;
}

export const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }:ModalAddFoodProps) => {
    const formRef = useRef(null);

    const handleSubmit = async (data:iFood) => {
        handleAddFood(data);
        setIsOpen();
    }    

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <h1>Novo Prato</h1>
                <Input name="image" placeholder="Cole o link aqui"/>

                <Input name="name" placeholder="Ex: Moda Italiana" />
                <Input name="price" placeholder="Ex: 19.90" />

                <Input name="description" placeholder="Descrição" />
                <button type="submit" data-testid="add-food-button">
                    <p className="text">Adicionar Prato</p>
                    <div className="icon">
                        <FiCheckSquare size={24} />
                    </div>
                </button>
            </Form>
        </Modal>
    );
}

