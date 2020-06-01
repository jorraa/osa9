import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { NewEntry } from '../../types';
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  entryType: string;
  onSubmit: (values: NewEntry) => void; 
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, entryType, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new diagnosis entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm entryType={entryType} onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
