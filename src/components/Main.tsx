import { Header } from "./Header";
// import { ItemList } from "./ItemList";
import { ComplexForm } from "./ComplexForm";
import { NotificationSystem } from "./NotificationSystem";
import { useTheme } from "../context/ThemeContext";
import { ItemList } from "./ItemList";
import { generateItems } from "../utils";
import { useState } from "react";

export default function Main() {
  const { theme } = useTheme();
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
}
