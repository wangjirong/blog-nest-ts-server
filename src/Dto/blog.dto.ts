export class BlogDto{
    title:string;
    desc: string;
    cover: Object;
    author: string;
    delivery: boolean;
    tags: Array<string>;
    context: string;
    comment: Array<object>;
}