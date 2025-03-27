'use client'


import { ItemsEntitySelect } from "@/components/entities/ItemsEntity"
import { IItems } from "@/components/shared/CardList"
import { useState } from "react"



export const ChartWidget = () => {


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedItem, setSelectedItem] = useState<null | IItems>(null)

    return (
        <ItemsEntitySelect anchor={"data"} onClick={setSelectedItem} defaultId={selectedItem && selectedItem.id} />
    )
}