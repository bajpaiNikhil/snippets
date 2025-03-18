'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation'; 
import { revalidatePath } from 'next/cache';

export async function editSnippet(id : number, code : string) {
    console.log('Edited snippet', id, code);
    await db.snippet.update({
        where: { id },
        data: { code }
        });
    redirect(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id : number) {  
    await db.snippet.delete({
        where: { id }
    });
    revalidatePath('/');

    redirect('/');
}

export async function createSnippet(formState : {message :string},formData : FormData) {

    try {
    // this need to be a server action \_o_/

    // Check the user's inputs and make sure they're valid
    const title = formData.get('title') ;
    const code = formData.get('code') ;

    if(typeof title !== 'string' || title.length < 3) {
        return {message :'Please provide a title'} ;
    }
    if(typeof code !== 'string' || code.length < 10) {
        return {message :'Please provide a code snippet'};
    }
    

    // If they are, create a new snippet in the database
    await db.snippet.create({
        data: {
            title,
            code
        }
    });
    // throw new Error('Failed to create snippet');
    } catch (err : unknown) {
        if (err instanceof Error) {
            return {
                message : err.message
            };
        }else{
            return {
            message : 'Something went wrong. Please try again later.'
        }
        }
    }

    // console.log('Snippet created!',snippet);
    // and redirect the user to the snippet page
    revalidatePath('/');

    redirect('/');
}