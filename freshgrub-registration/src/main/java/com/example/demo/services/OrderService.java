package com.example.demo.services;

import com.example.demo.entities.Cart;
import com.example.demo.entities.User;
import com.example.demo.entities.CartProduct;
import com.example.demo.entities.Menu;
import com.example.demo.repositories.MenuRepository;
import com.example.demo.repositories.CartRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.responses.OrderResponse;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.query.Criteria;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;

@EnableScheduling
@Service
public class OrderService {
	 private final MongoTemplate mongoTemplate;
    private final UserRepo userRepository;
    private final MenuRepository menuRepository;
    private final CartRepo cartRepository;

    public OrderService(MongoTemplate mongoTemplate, UserRepo userRepository, MenuRepository menuRepository, CartRepo cartRepository) {
    	this.mongoTemplate = mongoTemplate;
        this.userRepository = userRepository;
        this.menuRepository = menuRepository;
        this.cartRepository = cartRepository;
    }

    public ResponseEntity<OrderResponse> getWalletAmount(String userId) {
        Optional<User> user = userRepository.findById(userId);
        OrderResponse orderResponse = new OrderResponse();
        if (user.isEmpty()) {
            orderResponse.setMessage("No user found");
            orderResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
        }
        if(user.get().getRole().equals("user")) {
            orderResponse.setWalletAmount(user.get().getWallet());
            orderResponse.setMessage("Wallet Amount fetched successfully");
            orderResponse.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
        }
        else{
            // for vendor wallet earnings of the day

            LocalDate date =LocalDate.now();

           // Optional<List<Cart>> todaysOrder= cartRepository.findByDateAndIsOrderedTrue(date);
            Optional<List<Cart>> todaysOrder= cartRepository.findByDate(date);
            if(todaysOrder.isEmpty())
                orderResponse.setWalletAmount(0);
            else {
                int totalEarnings = 0;
                for (Cart cartItem : todaysOrder.get())
                {
                	 if(cartItem.getIsOrdered()) {
                         String itemId = cartItem.getItemId();
                         int quantity = cartItem.getQty();

                    int itemPrice = getItemPriceById(itemId);
                    int itemEarnings = itemPrice * quantity;

                    totalEarnings += itemEarnings;
                }
                }
                orderResponse.setWalletAmount(totalEarnings);
            }
            orderResponse.setMessage("Wallet Amount fetched successfully");
            orderResponse.setSuccess(true);
            return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
        }
    }

    public int getItemPriceById(String itemId) {
        Optional<Menu> menu = menuRepository.findById(itemId);
        if (menu.isPresent()) {
            return menu.get().getPrice();
        } else {

            return 0;
        }
    }

//    @Scheduled(cron = "0 0 0 * * *") // Run every day at midnight
//    public void updateWallets() {
//        List<User> users = userRepository.findAll();
//        users.forEach(user -> {
//            user.setWallet(150);
//            // Set default money
//            userRepository.save(user);
//        });
//    }
    
    @Scheduled(fixedDelay = 10000000)
    public void scheduleFixedDelayTask() {
        System.out.println("hello from scheduler");
        List<User> users = userRepository.findAll();
        users.forEach(user -> {
            user.setWallet(150);
            // Set default money
            userRepository.save(user);
        });
    }

    public ResponseEntity<OrderResponse> placeOrder(String userId, int orderAmount) {

        OrderResponse orderResponse = new OrderResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            orderResponse.setMessage("No user found");
            orderResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
        }

        User user = optionalUser.get();
        if (user.getWallet() < orderAmount) {

            orderResponse.setMessage("Insufficient balance");
            orderResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);

        }

        user.setWallet(user.getWallet() - orderAmount);
        userRepository.save(user); // Save the changes to the user's wallet

        Optional<List<Cart>> optionalUserCartItems = cartRepository.findByUserIdAndIsOrderedFalse(userId);
        List<Cart> userCartItems = optionalUserCartItems.get();
        

        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();
        System.out.println(localDate);
        
        userCartItems.forEach(cartItem -> {
            System.out.println(cartItem);
            cartItem.setIsOrdered(true);
            cartItem.setTime(localTime);
            cartItem.setDate(localDate);
        });
        cartRepository.saveAll(userCartItems);
        orderResponse.setWalletAmount(user.getWallet());


        orderResponse.setMessage("Successfully ordered");
        orderResponse.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }
    
    public ResponseEntity<OrderResponse> getOrderHistory(String userId) {
        OrderResponse orderResponse = new OrderResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            orderResponse.setMessage("No user found");
            orderResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
        }

        LookupOperation lookup = LookupOperation.newLookup()
                .from("menu_items")
                .localField("itemId")
                .foreignField("_id")
                .as("item");

        Aggregation aggregation =  Aggregation.newAggregation(Aggregation.match(Criteria.where("userId").is(userId).andOperator(Criteria.where("isOrdered").is(true))), lookup );

        List<CartProduct> cartItems = mongoTemplate.aggregate(aggregation, "cart", CartProduct.class).getMappedResults();

        orderResponse.setCartItems(cartItems);
        orderResponse.setMessage("Successfully fetched");
        orderResponse.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);

    }
    
    public ResponseEntity<OrderResponse> updateOrderStatus(String userId, String orderId, String newStatus) {
        OrderResponse orderResponse = new OrderResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            orderResponse.setMessage("No user found");
            orderResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
        }
        else{
            User vendor=optionalUser.get();
            if(vendor.getRole().equalsIgnoreCase("vendor"))
            {
                Optional<Cart> cartItemsOptional = cartRepository.findBy_idAndIsOrderedTrue(orderId);

                if (cartItemsOptional.isPresent())
                {
                    Cart userCartItems = cartItemsOptional.get();
                    userCartItems.setOrderStatus(newStatus);
                    cartRepository.save(userCartItems);
                    orderResponse.setMessage("Order Status updated succesfully");
                    orderResponse.setSuccess(true);
                    return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
                }
                else {
                    orderResponse.setMessage("No item found");
                    orderResponse.setSuccess(false);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
                }
            }
        }
        orderResponse.setMessage("Unathorized access");
        orderResponse.setSuccess(false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(orderResponse);
    }

    public ResponseEntity<OrderResponse> getOrders(String userId) {

        OrderResponse orderResponse = new OrderResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            orderResponse.setMessage("No user found");
            orderResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
        }
        else {
            User vendor=optionalUser.get();
            if(vendor.getRole().equalsIgnoreCase("vendor"))
            {
                LookupOperation lookup = LookupOperation.newLookup()
                        .from("menu_items")
                        .localField("itemId")
                        .foreignField("_id")
                        .as("item");

//                Aggregation aggregation =  Aggregation.newAggregation(Aggregation.match(Criteria.where("isOrdered").is(true)), lookup );

                Aggregation aggregation = Aggregation.newAggregation(
                        Aggregation.match(Criteria.where("isOrdered").is(true)),
                        Aggregation.sort(Sort.Direction.DESC, "_id"),
                        lookup
                );
                List<CartProduct> cartItems = mongoTemplate.aggregate(aggregation, "cart", CartProduct.class).getMappedResults();

                orderResponse.setCartItems(cartItems);
                orderResponse.setMessage("Successfully fetched ");
                orderResponse.setSuccess(true);
                return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
            }
        }
        orderResponse.setMessage("Unathorized access");
        orderResponse.setSuccess(false);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(orderResponse);

    }
    
}
