export default {
    name: 'products',
    type: 'document',
    title: 'Products',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'price',
            type: 'string',
            title: 'Price'
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'stock',
            type: 'string',
            title: 'Stock'
        },
        {
            name: 'pictures',
            title: 'Pictures',
            type: 'array',
            of:[{type:'image'}],
            options:{
                hotspot: true
            }

        },
        {
            name: 'priceId',
            type: 'string',
            title: 'Stripe price ID'
        }
    ]
}