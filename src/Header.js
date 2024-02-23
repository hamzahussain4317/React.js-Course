const Header = ({title}) => {
    const headerStyle = {
        backgroundColor: 'royalblue',
        color: '#fff'
    }
    return (
        < header style={headerStyle} >
            <h1>{title}</h1>
        </header >
    )


}
export default Header