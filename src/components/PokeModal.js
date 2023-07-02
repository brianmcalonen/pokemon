import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PokeModal = ({ show, onHide, pokemon }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon && pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pokemon && (
          <>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            {/* You can display other data of the Pokemon here */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokeModal;
