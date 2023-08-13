import React, { useEffect, useState } from "react";
import CommonTable from "../Common/CommonTable";

import { Box } from "@mui/material";

const PoolListTable = ({ TableData, poolData }) => {


  return (
    <Box mt={2}>
      <CommonTable headers={TableData} items={poolData} />
    </Box>
  );
};

export default PoolListTable;
