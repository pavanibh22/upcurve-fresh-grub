package com.example.demo.services;

import com.example.demo.entities.Cart;
import com.example.demo.entities.User;
import com.example.demo.repositories.CartRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.responses.OrderResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final UserRepo userRepository;

    private final CartRepo cartRepository;

    public OrderService(UserRepo userRepository, CartRepo cartRepository) {
        this.userRepository = userRepository;
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
        orderResponse.setWalletAmount(user.get().getWallet());
        orderResponse.setMessage("Wallet Amount fetched successfully");
        orderResponse.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }

    @Scheduled(cron = "0 0 0 * * *") // Run every day at midnight
    public void updateWallets() {
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

        Optional<List<Cart>> optionalUserCartItems = cartRepository.findAllByUserId(userId);
        List<Cart> userCartItems = optionalUserCartItems.get();
        userCartItems.forEach(cartItem -> {
            System.out.println(cartItem);
            cartItem.setIsOrdered(true);
        });
        cartRepository.saveAll(userCartItems);
        orderResponse.setWalletAmount(user.getWallet());


        orderResponse.setMessage("Successfully ordered");
        orderResponse.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(orderResponse);
    }
}