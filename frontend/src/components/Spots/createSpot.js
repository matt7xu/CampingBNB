import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import * as imageActions from "../../store/image";
import "./CreateSpot.css";


const CreateSpot = () => {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image0, setImage0] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [errors, setErrors] = useState({});
  // const [toggleSubmit, setToggleSubmit] = useState(false);

  useEffect(() => {
    // if (toggleSubmit) {
    const errorObj = {};
    if (!address) errorObj.address = "Address is required";
    if (!city) errorObj.city = "City is required";
    if (!state) errorObj.state = "State is required";
    if (!country) errorObj.country = "Country is required";
    if (!name) errorObj.name = "Name is required";
    if (!price) errorObj.price = "Price is required";
    if (!lat) errorObj.lat = "Latitude is required";
    if (!lng) errorObj.lng = "Longitude is required";
    if (description.length < 30) errorObj.description = "Description needs a minmum of 30 characters";
    if (!previewImage) errorObj.previewImage = "Preview image is required";
    if (previewImage && (checkImage(previewImage))) {
      errorObj.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image0 && (checkImage(image0))) {
      errorObj.image0 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image1 && (checkImage(image1))) {
      errorObj.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image2 && (checkImage(image2))) {
      errorObj.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image3 && (checkImage(image3))) {
      errorObj.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(errorObj);
    // }
  }, [address, city, state, country, lat, lng, name, description, price, previewImage, image0, image1, image2, image3]);

  const checkImage = (urlString) => {
    const endings = ["png", "jpg", "jpeg"];
    const array = urlString.split(".");
    if (endings.includes(array[array.length - 1])) {
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setToggleSubmit(true);

    const newSpot = { address, city, state, country, lat, lng, name, description, price, ownerId: user.id };

    const spot = await dispatch(spotActions.addSpotThunk(newSpot))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

    if (spot && Object.values(errors).length === 0) {
      await dispatch(imageActions.addSpotImageThunk({ url: previewImage, preview: true }, spot))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        })
      if (image0) {
        await dispatch(imageActions.addSpotImageThunk({ url: image0, preview: false }, spot))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          })
      }
      if (image1) {
        await dispatch(imageActions.addSpotImageThunk({ url: image1, preview: false }, spot))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          })
      }
      if (image2) {
        await dispatch(imageActions.addSpotImageThunk({ url: image2, preview: false }, spot))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          })
      }
      if (image3) {
        await dispatch(imageActions.addSpotImageThunk({ url: image3, preview: false }, spot))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          })
      }
    }
    setErrors({});
    setCountry('');
    setAddress('');
    setCity('');
    setState('');
    setLat('');
    setLng('');
    setDescription('');
    setName('');
    setPrice('');
    setPreviewImage('');
    setImage0('');
    setImage1('');
    setImage2('');
    setImage3('');

    if (spot) {
      history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <div>
      <div className="headerDiv">
        <h1>Create a new Spot</h1>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>
      </div>
      <form onSubmit={handleSubmit} className="createSpotForm">
        <div className="CountryDiv">
          <label>Country
            {errors.country && <p className="errors">{errors.country}</p>}
            <div>
              <input
                type='text'
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder='Country'
                name='country'
                className="input-box"
              />
            </div>
          </label>
        </div>
        <div className="StreetDiv">
          <label>Street Address
            {errors.address && <p className="errors">{errors.address}</p>}
            <div>
              <input
                type='text'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder='Address'
                name='address'
                className="input-box"
              />
            </div>
          </label>
        </div>
        <div className="CityStateDiv">
          <div className="CityDiv">
            <label>City
              {errors.city && <p className="errors">{errors.city}</p>}
              <div>
                <input
                  type='text'
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder='City'
                  name='city'
                  className="input-box"
                />
              </div>
            </label>
            <div className="StateDiv">

              <label>Latitude
                {errors.lat && <p className="errors">{errors.lat}</p>}
                <div>
                  <input
                    type='text'
                    onChange={(e) => setLat(e.target.value)}
                    value={lat}
                    placeholder='Latitude'
                    name='latitude'
                    className="input-box"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="LatLonDiv">
          <div className="LatDiv">
            <label>State
              {errors.state && <p className="errors">{errors.state}</p>}
              <div>
                <input
                  type='text'
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  placeholder='STATE'
                  name='state'
                  className="input-box"
                />
              </div>
            </label>
          </div>
          <div className="LonDiv">
            <label>Longitude
              {errors.lng && <p className="errors">{errors.lng}</p>}
              <div>
                <input
                  type='text'
                  onChange={(e) => setLng(e.target.value)}
                  value={lng}
                  placeholder='Longitude'
                  name='longitude'
                  className="input-box"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="DescriptionDiv">
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amenities
            like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name='body'
            placeholder='Please write at least 30 characters'
            className="DescriptionDiv-box"
          />
          {errors.description && <p className="errors">{errors.description}</p>}
        </div>
        <div className="NameDiv">
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='Name of your spot'
            name='name'
            className="input-box"
          />
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div className="PriceDiv">
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          <label className="PriceLabelDiv">  $  </label>
            <input
              type='text'
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder='Price per night (USD)'
              name='price'
              className="input-box"
            />

          {errors.price && <p className="errors">{errors.price}</p>}
        </div>
        <div className="imageDiv">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          {errors.previewImage && <p className="errors">{errors.previewImage}</p>}
          <input
            type='text'
            onChange={(e) => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder='Preview Image URL'
            name='image'
            className="input-box"
          />

          <input
            type='text'
            onChange={(e) => setImage0(e.target.value)}
            value={image0}
            placeholder='Image URL'
            name='image'
            className="input-box"
          />
          {errors.image1 && <p className="errors">{errors.image1}</p>}
          <input
            type='text'
            onChange={(e) => setImage1(e.target.value)}
            value={image1}
            placeholder='Image URL'
            name='image'
            className="input-box"
          />
          {errors.image2 && <p className="errors">{errors.image2}</p>}
          <input
            type='text'
            onChange={(e) => setImage2(e.target.value)}
            value={image2}
            placeholder='Image URL'
            name='image'
            className="input-box"
          />
          {errors.image3 && <p className="errors">{errors.image3}</p>}
          <input
            type='text'
            onChange={(e) => setImage3(e.target.value)}
            value={image3}
            placeholder='Image URL'
            name='image'
            className="input-box"
          />
          {errors.image4 && <p className="errors">{errors.image4}</p>}
        </div>
        <div className="SubmitButtonDiv">
          <button type='submit' disabled={Object.values(errors).length > 0}>Create Spot</button>
        </div>
      </form>
    </div>
  )
};

export default CreateSpot;
