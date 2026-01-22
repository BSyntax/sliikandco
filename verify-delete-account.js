import axios from "axios";
import fs from "fs";

const API_URL = "http://localhost:5000/api/users";
const OUTPUT_FILE = "verification-delete-output.txt";

const log = (message) => {
  console.log(message);
  fs.appendFileSync(OUTPUT_FILE, message + "\n");
};

// Clear previous log
fs.writeFileSync(OUTPUT_FILE, "");

const testUser = {
  name: "Delete Test User",
  email: `del${Date.now()}@example.com`,
  password: "Password123!",
};

async function verifyDeleteFlow() {
  log("--- Starting Account Deletion Verification ---");

  try {
    // 1. Register
    log(`\n1. Registering user: ${testUser.email}...`);
    const registerRes = await axios.post(API_URL, testUser);
    log("✅ Registration successful!");
    const userId = registerRes.data._id;
    log(`User ID: ${userId}`);

    // 2. Login
    log("\n2. Logging in...");
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    log("✅ Login successful!");
    const token = loginRes.data.token;
    log("Token received.");

    // 3. Delete Account
    log("\n3. Deleting Account...");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const deleteRes = await axios.delete(`${API_URL}/profile`, config);
    log("✅ Delete successful!");
    log(`Response: ${JSON.stringify(deleteRes.data)}`);

    // 4. Verification Check (Should fail to get profile)
    log("\n4. Verifying Deletion (trying to get profile)...");
    try {
      await axios.get(`${API_URL}/profile`, config);
      log("❌ TEST FAILED: User profile still accessible after deletion.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        log(
          "✅ VERIFICATION PASSED: User profile not found (404) as expected.",
        );
      } else {
        log(`❓ Unexpected error: ${error.message}`);
      }
    }
  } catch (error) {
    log("\n❌ Verification Failed with Error:");
    if (error.response) {
      log(`Status: ${error.response.status}`);
      log(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      log(error.message);
    }
  }
}

verifyDeleteFlow();
