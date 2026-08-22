import { useEffect, useState } from "react"
import { C } from "./Adminui"
import AdminSidebar from "./components/Adminsidebar"
import ProductsSection from "./sections/Productssection"
import CategoriesSection from "./sections/Categoriessection"
import SuppliersSection from "./sections/Supplierssection"
import UsersSection from "./sections/Userssection"
import { subscribeToCollection, addDocument } from "../../lib/Firestorecrud"

function Adminpanel() {
    const [section, setSection] = useState("products")

    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [colorOptions, setColorOptions] = useState([])

    useEffect(() => {
        const unsubCategories = subscribeToCollection("categories", setCategories, "name")
        const unsubSuppliers = subscribeToCollection("suppliers", setSuppliers, "name")
        const unsubColors = subscribeToCollection("colors", (docs) => setColorOptions(docs.map((d) => d.name)), "name")
        return () => {
            unsubCategories()
            unsubSuppliers()
            unsubColors()
        }
    }, [])

    async function addColorOption(name) {
        if (colorOptions.includes(name)) return
        await addDocument("colors", { name })
    }

    return (
        <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.cream, minHeight: "100vh", color: C.ink }}>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <AdminSidebar section={section} setSection={setSection} />
                <main style={{ flex: 1, padding: "40px 48px", maxWidth: 1100 }}>
                    {section === "products" && (
                        <ProductsSection
                            categories={categories}
                            suppliers={suppliers}
                            colorOptions={colorOptions}
                            addColorOption={addColorOption}
                        />
                    )}
                    {section === "categories" && <CategoriesSection />}
                    {section === "suppliers" && <SuppliersSection categories={categories} />}
                    {section === "users" && <UsersSection />}
                </main>
            </div>
        </div>
    )
}

export default Adminpanel