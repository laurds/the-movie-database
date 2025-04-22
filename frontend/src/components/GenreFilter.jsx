import { Listbox, Transition } from "@headlessui/react";

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
    return (
        <div className="genre-filter">
            <Listbox value={selectedGenre} onChange={setSelectedGenre}>
                <div className="relative">
                    <Listbox.Button className="listbox-button">
                        {selectedGenre ? genres.find((g) => g.id === selectedGenre)?.name : "Todos os gêneros"}
                    </Listbox.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition duration-75 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Listbox.Options className="listbox-options">
                            <Listbox.Option key="all" value="">
                                Todos os gêneros
                            </Listbox.Option>
                            {genres.map((g) => (
                                <Listbox.Option key={g.id} value={g.id}>
                                    {g.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default GenreFilter;
