import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Container } from './styles';
import api from '../../services/api';
import { IFood } from '../../interface/interface';

interface FoodProps {
  foods: IFood[];
  food: IFood;
  setFoods: ((fs: IFood[]) => void);
  handleEditFood: (f: IFood) => void;
  handleDelete: (id: number) => void;
}

const Food = ({ food, setFoods, foods, handleEditFood, handleDelete }: FoodProps) => {

  const toggleAvailable = async () => {

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });

    const newFoods = foods.map(i => i.id === food.id ? { ...i, available: !i.available } : i);
    setFoods(newFoods);
  }

  const setEditingFood = () => {
    handleEditFood(food);
  }

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food;
