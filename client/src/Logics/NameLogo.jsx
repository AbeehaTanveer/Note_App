export const initialWords = (name) => {

  if (!name) {
    return ''; // Return empty string if name is null or empty
  }
    const words = name.split(' '); 
    const initials = words.map((word)=>word[0]).join(''); 
    return initials;
  };