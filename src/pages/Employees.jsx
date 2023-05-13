import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page,
       Search, Inject,Toolbar } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { GridArcPoints } from '@syncfusion/ej2-charts';

const Employees = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="Employees"/>
    {/* All the spacing and alignment data is coming from ordersGrid */}
    <GridComponent
     dataSource={employeesData}
     allowPaging
     allowSorting
     toolbar={['Search']}
     width="auto"
    >     
     <ColumnsDirective>
     {employeesGrid.map((item,index) => (
       <ColumnDirective key={index} {...item}/>
       ))}
     </ColumnsDirective>
     <Inject services={[ Page, Search,Toolbar]}/>
    </GridComponent>
    </div>
  )
}

export default Employees