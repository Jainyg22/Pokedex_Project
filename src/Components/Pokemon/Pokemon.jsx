import './Pokemon.css'
import { Link } from 'react-router-dom'
function Pokemon({name,image,id}){
    return (
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`}>
            {/*<a href="/pokemon/2" />  but problem is that new page refreshes everytime*/} 
                <div className='pokemon-name'>{name}</div>
                <div ><img className='pokemon-image'src={image}/></div>
            </Link>
        </div>
    );
}

export default Pokemon;