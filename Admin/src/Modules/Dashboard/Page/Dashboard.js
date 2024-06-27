import React, { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts';

// @service
import { getListOrders } from '../../Order/Store/service';

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @utility
import { normalizeDate, formatToCurrencyVND } from '../../../utility/common';

const listMonthOfYear = []

for (let i = 1; i <= 12; i++) {
  const month = {
    month: i,
    value: 0
  }
  listMonthOfYear.push(month)
}

function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState([])

  useEffect(() => {
    const payload = {
      page: PAGE_DEFAULT,
      size: 10000,
      code: "",
    };
    fetchGetListOrders(payload);
  }, []);

  const fetchGetListOrders = async (payload) => {
    try {
      setLoading(true);
      const { data } = await getListOrders(payload);
      // console.log("res", data)
      if (data?.retCode === RETCODE_SUCCESS) {
        const { orders, ...rest } = data?.retData || {};
        const listOrderSuccess = orders?.filter(item => item?.statusOrder === 1)
        const normalize = normalizeDate(listOrderSuccess, listMonthOfYear)
        setListData(normalize)
        // console.log("normalize", normalize)
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      setLoading(false);
    }
  };

  const config = {
    data: listData,
    loading,
    xField: 'month',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    axis: {
      y: {
        // labelFontWeight: 700,
        labelFormatter: (v) => formatToCurrencyVND(v)
      }
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  return (
    <React.Fragment>
      <div className='container pt-3 pb-3'>
        <h1 className='text-uppercase'>Dashboard: Total revenue</h1>
      </div>
      <Line {...config} />
    </React.Fragment>
  )
}

export default Dashboard 