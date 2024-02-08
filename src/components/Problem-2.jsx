import  { useState, useEffect } from 'react';

function Problem2() {
  const [modalAVisible, setModalAVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [contactsA, setContactsA] = useState([]);
  const [contactsB, setContactsB] = useState([]);
  const [pageA, setPageA] = useState(1);
  const [pageB, setPageB] = useState(1);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);

  useEffect(() => {
    if (modalAVisible) {
      fetchContacts('all', pageA, setContactsA);
    }
  }, [modalAVisible, pageA]);

  useEffect(() => {
    if (modalBVisible) {
      fetchContacts('US', pageB, setContactsB);
    }
  }, [modalBVisible, pageB]);

  const fetchContacts = async (country, page, setContacts) => {
    try {
      const response = await fetch("https://contact.mediusware.com/api/contacts/?page=2");
      const data = await response.json();
      setContacts(prevContacts => [...prevContacts, ...data.contacts]);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleModalAOpen = () => {
    setModalAVisible(true);
    setContactsA([]);
    setPageA(1);
  };

  const handleModalBOpen = () => {
    setModalBVisible(true);
    setContactsB([]);
    setPageB(1);
  };

  const handleCloseModal = () => {
    setModalAVisible(false);
    setModalBVisible(false);
  };

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if (bottom) {
      if (modalAVisible) {
        setPageA(prevPage => prevPage + 1);
      }
      if (modalBVisible) {
        setPageB(prevPage => prevPage + 1);
      }
    }
  };

  const filteredContactsA = onlyEvenChecked ? contactsA.filter(contact => contact.id % 2 === 0) : contactsA;
  const filteredContactsB = onlyEvenChecked ? contactsB.filter(contact => contact.id % 2 === 0) : contactsB;

  return (
    <div>
      <button style={{ backgroundColor: '#46139f' }} onClick={handleModalAOpen}>Modal Button A</button>
      <button style={{ backgroundColor: '#ff7f50' }} onClick={handleModalBOpen}>Modal Button B</button>

      {modalAVisible && (
        <div className="modal" onScroll={handleScroll}>
          <button style={{ backgroundColor: '#46139f' }} onClick={handleModalAOpen}>Modal Button A</button>
          <button style={{ backgroundColor: '#ff7f50' }} onClick={handleModalBOpen}>Modal Button B</button>
          <button onClick={handleCloseModal}>Close</button>
          <label>
            <input type="checkbox" checked={onlyEvenChecked} onChange={() => setOnlyEvenChecked(!onlyEvenChecked)} />
            Only Even
          </label>
          <ul>
            {filteredContactsA.map(contact => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        </div>
      )}

      {modalBVisible && (
        <div className="modal" onScroll={handleScroll}>
          <button style={{ backgroundColor: '#46139f' }} onClick={handleModalAOpen}>Modal Button A</button>
          <button style={{ backgroundColor: '#ff7f50' }} onClick={handleModalBOpen}>Modal Button B</button>
          <button onClick={handleCloseModal}>Close</button>
          <label>
            <input type="checkbox" checked={onlyEvenChecked} onChange={() => setOnlyEvenChecked(!onlyEvenChecked)} />
            Only Even
          </label>
          <ul>
            {filteredContactsB.map(contact => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Problem2 ;
