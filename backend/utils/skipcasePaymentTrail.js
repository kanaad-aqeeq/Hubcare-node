const axios = require('axios');
const fetch = require("node-fetch"); 
const { v4 } = require("uuid");
const cryptojs = require("crypto-js");

// const WebhookKey= "6ed923f4-4981-40a3-b456-3753e5e0b35c"

// Sandbox Not Used.. Wrong
// const paymentGatewayDetails = {
// 	sandboxURL: "https://skipcashtest.azurewebsites.net", // Replace with the actual sandbox URL
// 	productionURL: "https://api.skipcash.app", // Replace with the actual production URL
// 	secretKey: "Muy42hvyiIOpZedvnb8tvdkAYOS9m6XvQHvdPYmBznJ+7NE+xESD1BCkSIgq2cCWEJkR9s/SfRo1s3LxCO8GzrBAdTqM4UtcN4oaUizL/TQU1DR2+wXiWEN2C62vbfHJqPulzOiToAzuxTqhrg1MGGIQ3i2TPlLPMw5X1uaDW4Jpw2jlo525wdJYkY8c5hG+mXNiQa4eXCJ2SjcDdsgFC3V+SuHxeCjeadPv4ABG4gXhKvZAuxQ5j9GvM2R66gJ8+h+4/yVet6D+VPLAY6kElO6Gepf5ADwIILuIzH9f0XbnUsa1kn0eQgh7OyaUGxVyyzHY55H/1D4lSToG/htvW4mg6IZvjVpt5VVr4rQeUt92mDywJMcdyp/Nrcw6iGH9hCzlPt0kPd9+cOn63zYFLOPI4PnzDCkE6h6rGMZ4sjo7A50g7d/1byaocW/ft20Ar3vR0J11g6mEmUq+f1ynFfliygQWNIVlxmFZp5lgBs+k1yxbkD9EMIlivNWUHOc9E5dpN5twYRBBlToPuUjOXA==", // Replace with the actual secretKey
// 	keyId: "17b225fb-ff4d-44b9-8df2-c222c289b36e", // Replace with the actual keyId
// 	clientId: "b08ad7da-77f7-4848-aa56-640464581312", // Replace with the actual clientId
// };

// Production Test 
const paymentGatewayDetails = {
	sandboxURL: "https://skipcashtest.azurewebsites.net", // Replace with the actual sandbox URL
	productionURL: "https://api.skipcash.app", // Replace with the actual production URL
	secretKey: "2W6cCMH6Qd+OV4MyDRXtHIqEPEtKRTOJlKnV0DaswV9sZYPJnk/YOqOc4Xs3lzGBC2cD037o6v+HrGkxcddvwxcOOHCPb6I7gxwvySJzWbm/whfYe8I+VX4/vs5TZM2/9XcpD+T4XPUiIx2bM26GsrM4AN1vWaDx7WXG+RSLr2e79BYc3L5yHh4KcXgKDni+SO2QR8nRKYqwYuiY8ZVVLRNPUIUzk0XKIjdbDi6ut/KPRTjxH3c+b3I9EcuNsePiaEx6jSd6u3aJHYgW4ySnpx3xnMMg1/sJMcjJbdLzWWqkDrVz8r+YZvzCum+DB+ujElCZIRQJji4qXV04mTMdeSoq/giavUlRQLoXIFFxC4fzs9PvN/wBH6inkOPkgZLl9h/2I4o0zmjvMtDsgIycllo3iXO32UYmQiKpDW7kb4K/5p+73UKtlhJQkKKT12UXJLaJuXhD5CGGGFEw43MAEwHAWw30EmURro/diACldz0BYl5CscPohEkTdU4GNt16XGTgDfj132mToEaZcZSESQ==", // Replace with the actual secretKey
	keyId: "6586547b-eca3-48e2-fd1a-08dda8d25100", // Replace with the actual keyId
	clientId: "c53fd4c7-9fe3-4cbd-3d19-08dda8d250f0", // Replace with the actual clientId
};

const generatePaymentRequest = async () => {
	// if any parameters are removed, it should be removed from combinedData as well.
	const paymentDetails = {
		Uid: v4(),
		KeyId: paymentGatewayDetails.keyId,
		Amount: "100",
		FirstName: "Deepak",
		LastName: "Developer",
		Phone: "7694994980",
		Email: "deep0123@gmail.com",
		Street: "123 Maple Avenue", // required for US, UK, and Canada cards only
		City: "Toronto", // required for US, UK, and Canada cards only
		State: "ON", // required for US, UK, and Canada cards only
		Country: "CA", // required for US, UK, and Canada cards only
		PostalCode: "M5H 2N2", // required for US, UK, and Canada cards only
		TransactionId: "TRA-123", // your internal order id
		Custom1: "Wallet", // optional
	};

	const combinedData = `Uid=${paymentDetails.Uid},KeyId=${paymentDetails.KeyId},Amount=${paymentDetails.Amount},FirstName=${paymentDetails.FirstName},LastName=${paymentDetails.LastName},Phone=${paymentDetails.Phone},Email=${paymentDetails.Email},Street=${paymentDetails.Street},City=${paymentDetails.City},State=${paymentDetails.State},Country=${paymentDetails.Country},PostalCode=${paymentDetails.PostalCode},TransactionId=${paymentDetails.TransactionId},Custom1=${paymentDetails.Custom1}`;

	const combinedDataHash = cryptojs.HmacSHA256(
		combinedData,
		paymentGatewayDetails.secretKey
	);

	const hashInBase64 = cryptojs.enc.Base64.stringify(combinedDataHash);

	try {
		const url = `${paymentGatewayDetails.sandboxURL}/api/v1/payments`;
		// Fetch (if you prefer using fetch)
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: hashInBase64,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(paymentDetails),
		});
		const data = await response.json();

		console.log("Payment response:", data);

		return data.resultObj || data;

		
		// Axios (if you prefer using axios)
		// const response = await axios.post(url, paymentDetails, {
		// 	headers: {
		// 	  Authorization: hashInBase64,
		// 	  "Content-Type": "application/json",
		// 	},
		//   });
	  
		//   console.log("Payment request response:", response.data);
		//   return response.data.resultObj || response.data;
	} catch (err) {
		// return err.message;
		return {
			status: "failed",
			errorMessage: err.message,
			error:err
		}
	}
};

// console.log("Generating payment request...");
// generatePaymentRequest()
//   .then((result) => {
//     console.log("Payment request generated successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error generating payment request:", error.message);
// });

module.exports = {
  generatePaymentRequest,
};