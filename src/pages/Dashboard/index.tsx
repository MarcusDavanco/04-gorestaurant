import React, { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface iFood {    
    available: boolean;
    image: string;
    name: string;
    description: string;
    price: number;
    id: string;
}



export const Dashboard = () => {
    const [foods, setFoods] = useState<iFood[]>([]);
    const [editingFood, setEditingFood] = useState<iFood>({} as iFood);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const loadFoods = async () => {
        const response = await api.get('/foods');
        setFoods(response.data)
    }

    useEffect(() => {
        loadFoods();
    }, [])

    const handleAddFood = async (food:iFood) => {
        try {
            const response: iFood[] = await api.post('/foods', {
                ...food,
                available: true,
            });

            setFoods(response);
        } catch (err) {
            console.error(err)
        }
    }

    const handleUpdateFood = async (food:iFood) => {
        try {
            const foodsUpdated : iFood[] = await api.put(`/foods/${editingFood.id}`, { ...editingFood, ...food });

            setFoods(foodsUpdated);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteFood = async (id:string) => {
        await api.delete(`/foods/${id}`);
        const foodsFiltered = foods.filter(food => food.id !== id);
        setFoods(foodsFiltered);
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    }

    const handleEditFood = (food: iFood) => {
        setEditingFood(food);
        setEditModalOpen(true);
    }

    return(<>
        <Header openModal={toggleModal} />
        <ModalAddFood
            isOpen={modalOpen}
            setIsOpen={toggleModal}
            handleAddFood={handleAddFood}
        />
        <ModalEditFood
            isOpen={editModalOpen}
            setIsOpen={toggleEditModal}
            editingFood={editingFood}
            handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
            {foods &&
                foods.map(food => (
                    <Food
                        key={food.id}
                        food={food}
                        handleDelete={handleDeleteFood}
                        handleEditFood={handleEditFood}
                    />
                ))}
        </FoodsContainer>
    </>)
}

