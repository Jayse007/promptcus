import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async ( request ) => {
    try {
        await connectToDB();
        
        const query =  Prompt.find({}).populate('creator');
        const  q  = request.nextUrl.searchParams?.get('q');
        const tag = request.nextUrl.searchParams?.get("tag");
        if ( q ) {
            query.or([
                {tag: {$regex: q, $options: "i"}}, 
                {prompt: {$regex: q, $options: "i"}}
            ]
            );    
        }

        if (tag) {
            const newquery = query.find({tag: {$regex: tag, $options: "i"}});
            const prompts = await query.exec();
            return Response.json(prompts, {
                status: 200
            });
        }

        const prompts = await query.exec();
        

        return Response.json(prompts, {
            status: 200
        });

    } catch (error) {
        return new Response(`Failed to fetch all prompts ${error}`, {
            status: 500
        });
    }
}