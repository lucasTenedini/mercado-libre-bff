import api from '../service/api.js';
import getMostUsedCategoryId from '../util/get-category.js';

class SearchController {
   async getSearch(req, res) {
      try {
         const resp = await api
            .get(`/sites/MLA/search?q=${req.query.q}`)
            .catch(() => {
               throw new Error('Producto no encontrada');
            });
         if (!resp) {
            return res.status(401).json({ error: 'Búsqueda no encontrada' });
         }

         const { results } = resp.data;
         const data = results.slice(0, 4);

         const categoryIds = data.map(result => {
            return result.category_id
         })

         const categId = getMostUsedCategoryId(categoryIds);

         const [categ] = await Promise.all([
            api.get(`/categories/${categId}`),
         ]).catch(() => {
            throw new Error('Id no encontrada');
         });

         const [...namePaths] = categ.data.path_from_root;
         const categories = namePaths.map(namePath => namePath.name);

         const items = data.map(result => {
            return {
               id: result.id,
               title: result.title,
               price: {
                  currency: result.currency_id,
                  amount: result.available_quantity,
                  decimals: result.price,
               },
               picture: result.thumbnail,
               condition: result.condition,
               free_shipping: result.shipping.free_shipping,
               address: result.address.state_name,
            };
         });

         return res.json({
            author: {
               name: 'Lucas',
               lastname: 'Tenedini',
            },
            categories,
            items,
         });
      } catch (err) {
         return res.status(404).json({ error: err.message });
      }
   }
}

export default new SearchController();
