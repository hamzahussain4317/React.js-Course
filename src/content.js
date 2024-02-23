
import Itemlist from './Itemlist'

const Content = ({ items, handleCheck, handleDelete }) => {

    return (
        <>
            {items.length > 0 ? (
                <Itemlist
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <p style={{ marginTop: '2rem' }}>No Item Exist</p>
            )}
        </>
    )
}




export default Content