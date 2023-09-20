package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.responses.OrderResponse;
import com.example.demo.services.OrderService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/user/checkout/{userId}")
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {

    @Autowired
    OrderService orderService;
    
    @GetMapping("/walletAmount")
    public ResponseEntity<OrderResponse> getwalletAmount(@PathVariable String userId) {
        return orderService.getWalletAmount(userId);
    }

    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder(@PathVariable String userId, @RequestParam int orderAmount) {
        return orderService.placeOrder(userId,orderAmount);

    }
    
    @GetMapping("/orderHistory")
    public ResponseEntity<OrderResponse> getOrderHistory(@PathVariable String userId)
    {
        return orderService.getOrderHistory(userId);
    }
    

    @GetMapping("/ordersForVendor")
    public ResponseEntity<OrderResponse> getOrders(@PathVariable String userId)
    {
        return orderService.getOrders(userId);
    }
    @PostMapping("/updateOrderStatus")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable String userId,
            @RequestParam String orderId,
            @RequestParam String newStatus
    ) throws MessagingException {
    	
    	
        System.out.println("UpdateOrderStatus" + " " + orderId);
        return orderService.updateOrderStatus(userId, orderId, newStatus);
    }
    
    
//    @PostMapping("/updateOrderStatus")
//    public ResponseEntity<OrderResponse> updateOrderStatus(
//            @PathVariable String userId,
//            @RequestParam String itemId,
//            @RequestParam String newStatus
//    ) {
//        System.out.println("inside controller" + " " + itemId);
//        System.out.println("inside controller" + " " + itemId);
//        return orderService.updateOrderStatus1(itemId, newStatus);
//    }
}