import { useState, useEffect } from 'react';
import AddItems from './AddItems'
import SearchItem from './SearchItem'
import Header from './Header'
import Content from './content'
import Footer from './footer'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([]);//here we first setname name(getname),SetName(setname)
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [error, setErrors] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Didnot recieve expected data')
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems)
        setErrors(null)
      }
      catch (err) {
        setErrors(err.message)
      } finally {
        setLoadingItem(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);

  }, [])




  const addItems = async (item) => {
    const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1
    const itemObj = { id: id, checked: false, item: item }
    const ListItems = [...items, itemObj]
    setItems(ListItems)

    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemObj)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setErrors(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? {
      ...item,
      checked: !item.checked
    } : item);
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id)
    const updateOption = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const newUrl = `${API_URL}/${id}`
    const result = await apiRequest(newUrl, updateOption)
    if (result) setErrors(result)
  }
  //now handle check is a modern function which takes the id of the item whose checked
  //status is change and create a shallow copy of items and run a map for every item and inside it
  //use a ternanry condition to checked a id if id is found it updates the cheked status of the new item
  //ortherwise it simply returns it it is far better than use foreach and check a id
  // like we did in js

  const handleDelete = async (id) => {
    const listItems = items.filter((items) => items.id !== id);
    setItems(listItems)
    const deleteOption={method:'DELETE'}
    const newUrl = `${API_URL}/${id}`
    const result = await apiRequest(newUrl, deleteOption)
    if (result) setErrors(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return
    addItems(newItem)
    setNewItem('')
  }


  return (
    <div className="App">
      <Header
        title={'Grocery List'} />

      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {loadingItem && <p>Loading Items.....</p>}
        {error && <p stle={{ color: "red" }}>{`Error: ${error}`}</p>}
        {!error && !loadingItem && <Content
          items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer
        length={items.length} />
    </div>
  );
}


export default App;
