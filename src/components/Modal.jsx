import { useState } from 'react';
import CerrarBtn from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({ 
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto 
}) => {

    const [error, setError] = useState(false);

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');

    const ocultarModal = () => {
        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);

        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')) {
            setError(true);

            setTimeout(() => {
                setError(false);
            }, 2500);
            return;
        }

        const gasto = {
            nombre,
            cantidad,
            categoria
        }

        guardarGasto(gasto);

    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="Btn Cerrar"
                    onClick={ocultarModal}
                />
            </div>
            <form
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>Nuevo Gasto</legend>

                {error && (
                    <Mensaje
                        tipo="error"
                    >
                        <p>Todos los campos son obligatorios</p>
                    </Mensaje>
                )}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto:</label>
                    <input 
                        type="text" 
                        placeholder='Añade el nombre del gasto'
                        id='nombre'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input 
                        type="number" 
                        placeholder='Añade la cantidad del gasto'
                        id='cantidad'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Nomobre Gasto:</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    value="Añadir Gasto"
                />

            </form>
        </div>
    )
}

export default Modal
