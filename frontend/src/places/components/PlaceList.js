import React, { useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceList.css";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);

  if (!props.items && auth.userId === props.curUser) {
    return (
      <div className="place-list center">
        <Card>
          <h2>You have no places yet. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  } else if (!props.items) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found.</h2>
          <h4>Check out someone else's profile</h4>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
