

const formElement = document.querySelector('form');

if (formElement) {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(formElement);
      const formDataObj = Object.fromEntries(formData);
      sendFormData(formDataObj);
    })
}


async function sendFormData(formDataObj) {
   try {
    const response = await fetch('/saveform',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataObj),
    })
    alert("form saved successfully!");
   } catch (error) {
     console.error('Error:', error);
   } 
}
