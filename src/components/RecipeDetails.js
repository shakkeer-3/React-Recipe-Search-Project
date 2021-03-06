import React, { Component } from 'react';
import {recipe} from "../tempDetails";
import { recipes } from '../tempList';

export default class RecipeDetails extends Component {
    // constructor(props){
    //     super(props);

    //     this.state ={
    //         recipe: recipe,
    //         url: `https://www.food2fork.com/api/get?key=7c225230e440096da6486d2bbd91b98f&rId=${
    //             this.props.id
    //         }`
    //     };
    // }

    // async componentDidMount() {
    //     try{
    //       const data = await fetch(this.state.url);
    //       const jsonData = await data.json();
    //       this.setState({
    //         recipe: jsonData.recipe
    //       });
    //     }catch(error){
    //       console.log(error);
    //     }
    //   }

    state = {
        recipe: recipe
    }

     async componentDidMount(){
            console.log(this.props.id);
            const id = this.props.id;
            const url = `https://www.food2fork.com/api/get?key=7c225230e440096da6486d2bbd91b98f&rId=${id}`
    
            try {
                const data = await fetch(url);
                const jsonData = await data.json();
                 this.setState(
              (state, props) => {
                return { recipe: jsonData.recipe };
              },
              () => {}
            );     
              } catch (error) {
                console.log(error);
              }
        }

    render() {
        const{
            image_url,
            publisher,
            publisher_url,
            source_url,
            title,
            ingredients
        } = this.state.recipe;
        const { handleIndex } = this.props;
        return (
            <React.Fragment>
                 <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <button type="button" className="btn btn-warning mb-5"
                            onClick={() => handleIndex(1)} 
                            >Back to recipe list</button>
                            <img src={image_url} className="d-block w-100" alt="recipe" />
                        </div>
                        {/* details */}
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h5 className="text-uppercase">{title}</h5>
                            <h6 className="text-slanted">
                                Provided By <b>{publisher}</b>
                            </h6>
                            <a href={publisher_url} target="_blank" className="btn btn-primary mt-2" rel="noopener noreferrer">
                                Publisher webpage
                            </a>
                            <a href={source_url} target="_blank" className="btn btn-outline-primary mt-2 mx-1" rel="noopener noreferrer">
                                Recipe Url
                            </a>
                            <ul className="list-group list-group-flush mt-4">
                                <h2 className="mt-3 mb-4 ">Ingredients</h2>
                                {ingredients.map((item, index) => {
                                    return (
                                        <li key={index} className="text-slanted">
                                            {item}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}