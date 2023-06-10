import { useDispatch } from "react-redux";

import * as spotActions from "../../store/spots";
import "./Spots.css";


function DeleteSpot({setShowModal, spotId}) {
    const dispatch = useDispatch();

    const confirmButtonHandler = async(e) => {
        e.preventDefault();
        await dispatch(spotActions.deleteSpotThunk(spotId));
    };

    const handleDeleteNoButton = () => {
        setShowModal(false)
    }

    return(
        <div className="deleteSpotButtonDiv">
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this spot from the listings?</h5>
            <button className="deleteYesButton" onClick={confirmButtonHandler}>Yes (Delete Spot)</button>
            <button className="deleteNoButton" onClick={handleDeleteNoButton}>No (Keep Spot)</button>
        </div>
    )
};

export default DeleteSpot;
