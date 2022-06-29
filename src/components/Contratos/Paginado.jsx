import React from "react";
import "./paginado.css";


export default function Paginado({ContractPage, totalContracts, paginado,currentPage}){
    const pageNumbers= []
    
    console.log("en el paginado",ContractPage, totalContracts, paginado,currentPage)
    for(let i=0; i<= Math.ceil(totalContracts/ContractPage)-1 ; i++){
        pageNumbers.push(i + 1)
    }
    return (
        <div>
            
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="paginado" key={number}>
                    <button
              className={`botonPaginado ${currentPage === number ? "current-page" : ""}`}
              onClick={() => paginado(number)}>{number}
              </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}