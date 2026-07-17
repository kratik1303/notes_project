import { useEffect,useState } from "react";
import API  from "../services/api";
import NoteForm from "../components/NoteForm";

function Home(){
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        fetchNotes();
    },[]);

    const fetchNotes = async () =>{
        try{
            const response = await API.get('/notes')
            setNotes(response.data)
        }
        catch(error){
            console.log(error)
        }
    };

    const addNote = async (note) => {
  try {
    await API.post("/notes", note);
    fetchNotes();
  } catch (error) {
    console.log(error);
  }
};

    return (
        <div>
            <h1>Notes App</h1>
            <NoteForm addNote={addNote} />
            {notes.map((note)=>(
                <div key ={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Home;
