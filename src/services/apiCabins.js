import supabase, { supabaseUrl }  from "./supabase,js"

export async function getCabins() {
    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be laoded')
    }

    return data
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
      );
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    // https://fkctegvunlfbfihtlbeb.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg

    // Create or Edit a Cabin
    let query = supabase.from('cabins')

    // Create New Cabin
    if (!id) query = query
        .insert([{ ...newCabin, image: imagePath }])

    // Edit a Cabin
    if (id) query = query
        .update({ ...newCabin, image: imagePath })
        .eq('id', id)
        .select()

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be created')
    } 

    // Upload an image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image)

    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        console.error(storageError)
        throw new Error('Cabin image could not be upload and the Cabim was not created')
    }

    return data
}

export async function deleteCabin(id) {    
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be deleted')
    }

    return null
}