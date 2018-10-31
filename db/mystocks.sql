select o.id,o.stock_name,o.symbol,o.shares,o.purchase_price,i.customer_name
from owned_stock o
join investors i 
on o.user_id=i.id
where i.id=$1
order by o.stock_name;