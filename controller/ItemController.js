import api from '../service/api.js';

class ItemController {
   async getItem(req, res) {
      const { id } = req.params;

      try {
         const [product, description] = await Promise.all([
            api.get(`/items/${id}`),
            api.get(`/items/${id}/description`),
         ]).catch(() => {
            throw new Error('Id no encontrada');
         });

         if (!product) {
            throw new Error('Producto no encontrada');
         }

         if (!description) {
            throw new Error('La descripción no existe');
         }

         const {
            category_id,
            title,
            price,
            currency_id,
            available_quantity,
            pictures,
            condition,
            shipping: { free_shipping },
            sold_quantity,
         } = product.data;

         const { plain_text } = description.data;
         const picture = pictures[0].url;

         const [categ] = await Promise.all([
            api.get(`/categories/${category_id}`),
         ]).catch(() => {
            throw new Error('Id no encontrada');
         });

         const [...namePaths] = categ.data.path_from_root;
         const categories = namePaths.map(namePath => namePath.name);

         const item = {
            id,
            title,
            price: {
               currency: currency_id,
               amount: available_quantity,
               decimals: price,
            },
            picture,
            condition,
            free_shipping,
            sold_quantity,
            description: plain_text,
         };

         return res.json({
            author: {
               name: 'Lucas',
               lastname: 'Tenedini',
            },
            item,
            categories,
         });
      } catch (err) {
         return res.status(404).json({ error: err.message });
      }
   }
}

export default new ItemController();
