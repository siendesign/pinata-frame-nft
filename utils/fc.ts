export const getConnectedAddressForUser = async (fid: number) => {
    console.log("fid:", fid);
    try {
        const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MDdmYzgwYS1kNTY2LTQzNWYtYTM0My1lNTNkOGVmNjFjMTkiLCJlbWFpbCI6InZpY3Rvcnllc3NpZW4wMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODhmOWEwNDYxMDQxYTZiMDFjMWQiLCJzY29wZWRLZXlTZWNyZXQiOiJkMGM3YmZkNTEzYTNiNmViZDMyMTcwOGViZDM5ODEyYzg0NzgzZjk0YjkzNjc2ODY0MmFlYTZiNWQ5OWQyZmU4IiwiZXhwIjoxNzczOTkzMjk1fQ.6Y6TufVt3Pv71U5B3nGWrR3gwcmggpYkmhAQg1Kyhak'
        }
        };
        const res = await fetch(`https://api.pinata.cloud/v3/farcaster/users/${fid}`,options);
        const json = await res.json();

        console.log('API Response:', JSON.stringify(json, null, 2));

        const address = json.user.custody_address
        return address
        
    } catch (error) {
        console.error('Error fetching verification:', error);
        return null;
    }
  }