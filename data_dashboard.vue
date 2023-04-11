<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-custom px-3">
      <a class="navbar-brand" href="#">PYTHONFLIX</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Support Chat</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Data Dashboard</a>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" style="color: rgb(156, 232, 43)" href="#"
              >Login</a
            >
          </li>
          <li class="nav-item">
            <span class="navbar-text">|</span>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color: rgb(156, 232, 43)" href="#"
              >Register</a
            >
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="row">
              <div class="col-6">
                <p style="color: #ccc">
                  <span style="font-size: 12px">Number of</span><br />Customer
                </p>
              </div>
              <div class="col-6 stat">
                <p style="color: #008ffb">
                  {{ number_of_user.customer }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card">
            <div class="row">
              <div class="col-6">
                <p style="color: #ccc">
                  <span style="font-size: 12px">Number of</span><br />Supporter
                </p>
              </div>
              <div class="col-6 stat">
                <p style="color: #57ffc4">
                  {{ number_of_user.supporter }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card">
            <div class="row">
              <div class="col-6">
                <p style="color: #ccc">
                  <span style="font-size: 12px">Number of</span><br />Video
                </p>
              </div>
              <div class="col-6 stat">
                <p style="color: #ff8598">{{ number_of_video }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card">
            <div class="row">
              <div class="col-6">
                <p style="color: #ccc">
                  <span style="font-size: 12px">Download</span><br />Data
                </p>
              </div>
              <div class="col-6 stat">
                <p style="font-size: 20px">JSON | CSV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="box shadow" style="margin-top: 0px; margin-bottom: 0px">
            <client-only>
              <ApexCharts
                :options="donut_params.options"
                :series="donut_params.series"
              />
            </client-only>
          </div>
        </div>
        <div class="col-8">
          <div class="box shadow" style="margin-top: 0px; margin-bottom: 0px">
            <client-only>
              <ApexCharts
                :options="line_params.options"
                :series="line_params.series"
                :height="250"
                :width="800"
              />
            </client-only>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="box shadow" style="height: 80%">
            <client-only>
              <ApexCharts
                :options="bar_params.options"
                :series="bar_params.series"
                :height="250"
                :width="700"
              />
            </client-only>
          </div>
        </div>
        <div class="col-4">
          <div class="box shadow">
            <client-only>
              <ApexCharts
                :options="donut_params.options"
                :series="donut_params.series"
              />
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import donut_graph from '/static/graph_options/donut_graph.json'
import line_graph from '/static/graph_options/line_graph.json'
import bar_chart from '/static/graph_options/bar_chart.json'

export default Vue.extend({
  name: 'DataDashboardPage',
  data() {
    return {
      line_series: [
        {
          name: 'Music',
          data: [1, 15, 26, 20, 33, 27],
        },
        {
          name: 'Photos',
          data: [3, 33, 21, 42, 19, 32],
        },
        {
          name: 'Files',
          data: [0, 39, 52, 11, 29, 43],
        },
      ],
    }
  },

  async asyncData({ $axios }) {
    const number_of_user = await $axios
      .$get('https://olf883-8080.csb.app/api/get/user')
      .then((res) => {
        const customer = res.data.filter((x) => x.role === 3).length
        const supporter = res.data.filter((x) => x.role === 2).length
        return { customer, supporter }
      })
    const bar_params = await $axios
      .$get('https://olf883-8080.csb.app/api/get/message')
      .then((res) => {
        const customer_messages = res.data.filter(
          (x) => x.sender_user_id == x.receiver_user_id
        )
        let today = new Date() // get current date and time
        let day_offset = 60 * 60 * 24 * 1000
        let message_count = {}

        for (let n = 14; n >= 0; n--) {
          let n_day_offset = day_offset * n
          let n_day_ago = new Date(today.getTime() - n_day_offset)
          let date = `${n_day_ago.getDate()}/${
            n_day_ago.getMonth() + 1
          }/${n_day_ago.getFullYear()}`
          message_count[date] = 0
        }

        for (let i = 0; i < customer_messages.length; i++) {
          let timestamp = parseInt(customer_messages[i].timestamp) * 1000
          let datetime = new Date(timestamp)
          let date = `${datetime.getDate()}/${
            datetime.getMonth() + 1
          }/${datetime.getFullYear()}`
          if (date in message_count) {
            message_count[date] += 1
          }
        }
        let month = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        let labels = []
        let series = []
        for (let date in message_count) {
          let tmp = date.split('/')
          let day = tmp[0]
          labels.push(`${day} ${month[parseInt(tmp[1]) - 1]}`)
          series.push(message_count[date])
        }
        let options = bar_chart.options
        options['labels'] = labels
        series = [{ name: 'Customer Messages', data: series }]
        return { options, series }
      })
    const number_of_video = await $axios
      .$get('https://olf883-8080.csb.app/api/get/video')
      .then((res) => res.data.length)
    const package_table = await $axios
      .$get('https://olf883-8080.csb.app/api/get/package')
      .then((res) => {
        let package_table = {}
        for (let i = 0; i < res.data.length; i++) {
          let package_id = res.data[i].package_id
          if (!(package_id in package_table)) {
            package_table[package_id] = res.data[i]
          }
        }
        return package_table
      })
    const donut_params = await $axios
      .$get('https://olf883-8080.csb.app/api/get/user')
      .then((res) => {
        let labels = []
        let series = {}
        for (let key in package_table) {
          let package_id = package_table[key].package_id
          let package_name = package_table[key].package_name
          labels.push(package_name)
          series[package_id] = 0
        }
        series[-1] = 0
        labels.push('No Subscription')
        let user = res.data
        for (let i = 0; i < user.length; i++) {
          if (user[i].role == 3) {
            let package_id = user[i].package_id
            if (!package_id) {
              series[-1] += 1
            } else {
              series[user[i].package_id] += 1
            }
          }
        }
        let tmp_series = []
        for (let key in series) {
          tmp_series.push(series[key])
        }
        series = tmp_series
        let options = donut_graph.options
        options['labels'] = labels
        return { options, series }
      })
    const line_params = await $axios
      .$get('https://olf883-8080.csb.app/api/get/bill')
      .then((res) => {
        let series = {}
        for (let key in package_table) {
          series[key] = {
            name: package_table[key].package_name,
            data: new Array(12).fill(0),
          }
        }
        let bills = res.data
        let today = new Date()
        for (let i = 0; i < bills.length; i++) {
          let package_id = `${bills[i].package_id}`
          let start_timestamp = parseInt(bills[i].start_timestamp) * 1000
          if (
            Math.abs(today.getTime() - start_timestamp) / 60 / 60 / 24 / 1000 <
            365
          ) {
            let month = new Date(start_timestamp).getMonth()
            if (month != today.getMonth()) series[package_id].data[month] += 1
          }
        }
        let tmp_series = []
        for (let key in series) {
          let name = series[key].name
          let data = series[key].data
          tmp_series.push({ name, data })
        }
        for (let i = 0; i < tmp_series.length; i++) {
          tmp_series[i].data = tmp_series[i].data
            .slice(today.getMonth() + 1)
            .concat(tmp_series[i].data.slice(0, today.getMonth() + 1))
        }
        series = tmp_series
        let options = line_graph.options
        let month = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
        let labels = month
          .slice(today.getMonth() + 1)
          .concat(month.slice(0, today.getMonth() + 1))
        options['labels'] = labels
        return { options, series }
      })
    return {
      number_of_user,
      bar_params,
      number_of_video,
      line_params,
      package_table,
      donut_params,
    }
  },
})
</script>

<style>
body {
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* background-color: #2b2d3e; */
  color: #777;
}

.box {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 25px;
  margin: 20px;
}

.shadow {
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
}

.navbar-custom {
  background-color: #1d2638;
}

.navbar-custom .navbar-brand {
  font-family: 'Bebas Neue', cursive;
  font-size: 2rem;
  color: #e50914;
  padding: 0px;
}

.navbar-custom .nav-link,
.navber-custom .navbar-text {
  color: #ccc;
}

.card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 10px 20px 0px 20px;
  margin: 20px;
}

.stat {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  align-items: center;
  top: 5px;
}
</style>
