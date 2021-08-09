import React, { Component } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Service from './service';

import Header from './components/header';
import ProductList from './components/product-list';
import './App.css';


export default class App extends Component {

  state = {
    advIDFilter: "",
      filter: false,
      activeId: [],
      data: [],
      url: "",
      loading: true,
      service: new Service(),
      hasError: false
  }
  
  componentDidMount() {
    this.setUrl()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
        this.update()
    }
  }


  //set request URL if its available ib cookies
  setUrl() {
      if (document.cookie !== "") {
        this.setState((state) => {
            return {
                ...state,
                url: document.cookie
            }
        })
      }
  }


  // get data from the server if user chose category  
  update() {

    if (this.state.url !== "") {
        this.state.service.getResourse(this.state.url)
        .then((data) => {
            this.setState((state) => {
                return {
                ...state,
                data: [...data],
                activeId: [],
                loading: false,
                service: new Service(),
                hasError: false,}
            })
        })
        .catch(() => {
            this.setState({ hasError: true, loading: false })
        })
    } else {
        this.setState((state)=>{
            return {...state,
            data: [],
            loading: false,
            hasError: false,}
        })
    }
    
  }

  

  componentDidCatch() {
      console.log('did catch')
      this.setState((state)=>{
          return{...state,hasError: true}
      })
  }

  // set Category in url for request and set Category in cookie
  handlerCategory = (e) => {

    this.setState((state) => {
        return {
            ...state,
            url: e.target.value
        }
    })

    document.cookie = e.target.value
    
  }
  
  onFilter = () => {
        this.setState((state) => {
            return {
                ...state,
                filter: !state.filter
            }
        })
  }

  onAdvIDFilter = (e) => {
    this.setState((state) => {
        return {
            ...state,
            advIDFilter: e.target.value,
        }
    })
  }
  

  // request author data and gather all of the active card ID’s.
  onFilterActive = () => {
      
        if (this.state.activeId.length === 0) {
            let idArr= this.state.data.map(el => el.advID)
            this.state.service.processArray(idArr)
            .then((res) =>  {
              let newArr = [];
              console.log(res)
              res.map((el) => {
                  if (el.items !== undefined) {
                      el.items.map((elem) => {
                          if (newArr.length === 0) {
                              newArr.push(elem.id)
                          } else {
                              if (!newArr.includes(elem.id)) {
                                  newArr.push(elem.id) 
                              }
                          } 
                          return elem
                      })
                  }
                  return el
                  
          })
              return new Promise((res,rej) => res(newArr))
              
              })
            .then((res) => {
              this.setState((state) => {
                  return {
                      ...state,
                      activeId: res
                  }
              })
            })
        
        } else {
            this.setState((state) => {
                return {
                    ...state,
                    activeId: [],
                }
            })
        }
      
      
  }

 
  onSort = (arr, key) => {
    let newArr = arr.map(el => el[key]).map( (el, i, final) =>  final.indexOf(el) === i && i).filter(el => arr[el]).map(el => arr[el]);
    return newArr
  }

  render() {
      const { hasError, data, loading, filter, advIDFilter, activeId} = this.state
   
        
      if (hasError) {
          return <p>ERROR</p>
      }
      
      let dataArr = data

      //sort the data for "ProductList" when unique card ON
      let uniqueArr = this.onSort(data, "id")
        
      
      //sort the data for the "select" tag
      let uniqueAdvIDArr = this.onSort(data, "advID");

        // work when checkbox for Only unique card ON
      if (filter) {
          dataArr = uniqueArr
      }
      
        // work when selected Author
      if (advIDFilter !== "") {
          dataArr = dataArr.filter(el => el.advID === advIDFilter)
      }

        // work when checkbox for onlyactivecard ON
      if (activeId.length !== 0) {
        dataArr = uniqueArr.filter(el => activeId.includes(el.id))
      } 
      
        
      return (
          <div className="container">
              
                  <Router>
                        
                        <Header handlerCategory={this.handlerCategory} url={this.state.url}/>
                        <div>
                            <input onChange={() => this.onFilter()} type="checkbox" id="filter" name="filter" />
                            <label htmlFor="filter">Only unique card</label>
                        </div>
                        <div>
                            <input onChange={() => this.onFilterActive()} type="checkbox" id="filter" name="filter" />
                            <label htmlFor="filter">Only Active Card</label>
                        </div>
                        <select onChange={(e) => this.onAdvIDFilter(e)} className="sort" name="sort">
                            <option value=""> without </option>
                            {uniqueAdvIDArr.map((el,idx) =><option key={idx} value={el.advID}> {el.advID}</option> )}
                        </select>
                        {loading ? <p>Loading</p> : this.state.url === "" ? <p>Pick any category!</p> : <ProductList data={dataArr}/>}
               
                  </Router>



              
          </div>
      )
  }
}




