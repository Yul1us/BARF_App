

//upload_preset:
//react-journal

export const fileUpoload = async ( file ) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dckgitjcv/upload';

    //se debe recrear el ejercicio de subein la imagen,
    //como en postman
    //se le añaden dos propiedades:
    const formData = new FormData();
    formData.append( 'upload_preset','react-journal' );
    formData.append( 'file',file );

    //manejamos el error, cuando lo enviamos
    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            //secure_url -> esto lo vimos en postman
            //si funciona:  "secure_url": "https://res.cloudinary.com/dckgitjcv/image/upload/v1646190554/oaxvxsh154e8gvbyur89.ico"

            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (err) {
        //console.log(error)
        throw err;
    }
    



}