import React, { useState, useContext } from 'react'

import './PlaceItem.css'
import Card from '../../shared/components/UIElement/Card'
import Button from '../../shared/components/FormElement/Button'
import Modal from '../../shared/components/FormElement/Modal'
// import Map from '../../shared/components/UIElement/Map'
import Map from '../../shared/components/UIElement/Map2'
import { AuthContext } from '../../shared/contexts/auth-context'
import BackDrop from '../../shared/components/Navigation/BackDrop'

const PlaceItem = props => {

    const auth = useContext(AuthContext)

    const [ showModal, setShowModal ] = useState(false)

    const [showMap, setShowMap] = useState(false)

    const openMapHandler = () => setShowMap(true)

    const closeMapHandler = () => setShowMap(false)

    const showModalHandler = () => {
        setShowModal(true)
    }

    const onCancelHandler = () => {
        setShowModal(false)
    }

    const onConfirmHandler = () => {
        setShowModal(false)
        console.log("DELETED...")
    }  

    return (
        <React.Fragment>
            <Modal 
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass='place-item__modal-actions'
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal
                show={showModal}
                header="Are you sure ?"
                contentClass="place-item__modal-content"
                footerClass='place-item__modal-actions'
                footer={
                    <React.Fragment>
                        <Button inverse onClick={onCancelHandler}>Cancel</Button>
                        <Button danger onClick={onConfirmHandler}>Delete</Button>
                    </React.Fragment>
                }
              
            >
                Once Deleted will not be able to retrive.
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.alt}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {auth.isLoggedIn && <Button danger onClick={showModalHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem